import { PostgresService } from './../../common/database/postgres.service';
import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly postgresService: PostgresService,
    private jwtService: JwtService,
  ) {}

  signIn(signInDto: any): Observable<any> {
    return from(
      this.postgresService
        .query('SELECT * FROM users WHERE email = $1', [signInDto.email])
        .then(async (user) => {
          if (user.length === 0 || !user) {
            return new Error('Email or password is incorrect');
          }

          const isValid = await bcrypt.compare(
            signInDto.password,
            user[0].password,
          );

          if (!isValid) {
            return new Error('Email or password is incorrect');
          }

          const { access_token, refresh_token } = await this.generateToken(
            user[0].id,
            user[0].email,
            user[0].role_id,
          );

          return {
            access_token,
            refresh_token,
          };
        }),
    );
  }

  signUp(signUpDto: any): Observable<any> {
    return from(
      bcrypt.hash(signUpDto.password, 10).then(async (hash) => {
        const userExists = await this.postgresService.query(
          'SELECT * FROM users WHERE email = $1',
          [signUpDto.email],
        );

        if (userExists.length > 0) {
          return new Error('User already exists');
        }

        const user = await this.postgresService.query(
          'INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3) RETURNING *',
          [signUpDto.email, hash, signUpDto.role_id],
        );

        if (user.length === 0 || !user) {
          return new Error('User not found');
        }

        const { access_token, refresh_token } = await this.generateToken(
          user[0].id,
          user[0].email,
          user[0].role_id,
        );

        return {
          access_token,
          refresh_token,
        };
      }),
    );
  }

  // generate access token and refresh token
  async generateToken(userId: string, username: string, roleId: string) {
    const payload = { sub: userId, username, roleId };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
      secret: process.env.ACCESS_TOKEN_SECRET,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    return { access_token, refresh_token };
  }
}
