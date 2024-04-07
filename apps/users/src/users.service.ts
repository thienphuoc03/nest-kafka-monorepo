import { Injectable } from '@nestjs/common';
import { PostgresService } from 'apps/common/database/postgres.service';
import { Observable, from, map } from 'rxjs';
import { of } from 'rxjs';
@Injectable()
export class UsersService {
  constructor(private readonly postgresService: PostgresService) {}

  getUsers(): Observable<any> {
    return of(this.postgresService.query('SELECT * FROM users'));
  }

  getUserById(id: number): Observable<any> {
    // const userExists = this.postgresService.query(
    //   'SELECT * FROM users WHERE id = $1',
    //   [id],
    // );

    // if (!userExists) {
    //   return of('User not found');
    // }

    return from(
      this.postgresService.query('SELECT * FROM users WHERE id = $1', [id]),
    ).pipe(
      map((user) => {
        if (user.length === 0 || !user) {
          return new Error('User not found');
        }

        console.log('user', JSON.stringify(user));
        return user[0];
      }),
    );
  }

  createUser(payload: any): Observable<any> {
    return from(
      this.postgresService.query(
        'INSERT INTO users (name) VALUES ($1) RETURNING * ',
        [payload.name],
      ),
    ).pipe(
      map((user) => {
        if (user.length === 0 || !user) {
          return new Error('User not found');
        }

        console.log('user', JSON.stringify(user));
        return user[0];
      }),
    );
  }

  updateUser(id: number, name: string, email: string): Observable<any> {
    return of(
      this.postgresService.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
      ),
    );
  }

  deleteUser(id: number): Observable<any> {
    const userExists = this.postgresService.query(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );

    if (!userExists) {
      return of('User not found');
    }

    return of(
      this.postgresService.query('DELETE FROM users WHERE id = $1', [id]),
    );
  }
}
