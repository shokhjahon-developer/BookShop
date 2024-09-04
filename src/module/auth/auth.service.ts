import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { generate } from 'otp-generator';
import sendMail from 'services/send-email.util';
import { appConfig } from '@config';
import { VerifyDto } from './dto/verify.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async register({ email, firstname, lastname, password }: RegisterDto) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const code = generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const findUser = await this.prisma.otp.findFirst({
      where: {
        email: email,
      },
    });

    if (findUser) {
      await this.prisma.otp.update({
        where: {
          email: email,
        },
        data: {
          otp: code,
        },
      });
    } else {
      const hashedPass = await hash(password, 12);

      await this.prisma.otp.create({
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hashedPass,
          otp: code,
        },
      });
    }

    sendMail(email, code);

    return 'Verification code has been sent to your email!';
  }

  async verify({ email, code }: VerifyDto) {
    const user = await this.prisma.otp.findFirst({
      where: { email: email, otp: code },
    });
    if (!user) {
      throw new BadRequestException('Email or code is incorrect!');
    }

    const newUser = await this.prisma.user.create({
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      },
    });

    const token = this.jwt.sign(
      { id: newUser.id, isAdmin: newUser.isAdmin },
      {
        secret: appConfig.jwtSecretKey,
        expiresIn: '5h',
      },
    );
    return { data: token };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }
    const token = await this.jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      {
        secret: appConfig.jwtSecretKey,
        expiresIn: '5h',
      },
    );
    return { data: token };
  }

  async adminLogin({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user || !user.isAdmin) {
      throw new BadRequestException('Invalid email or password');
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }
    const token = this.jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      {
        secret: appConfig.jwtSecretKey,
        expiresIn: '5h',
      },
    );
    return { data: token };
  }
}
