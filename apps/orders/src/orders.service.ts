import { PostgresService } from 'apps/common/database/postgres.service';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'apps/users/src/users.service';
import { ProductsService } from 'apps/products/src/products.service';
import { Observable, from, map, switchMap } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly customersService: UsersService,
    private readonly postgresService: PostgresService,
  ) {}

  createOrder(order: any, orderDetail: any): Observable<any> {
    const order$ = this.postgresService.query(
      'INSERT INTO orders (customer_id, total) VALUES ($1, $2) RETURNING *',
      [order.customer_id, order.total],
    );
    const orderDetail$ = this.postgresService.query(
      'INSERT INTO order_details (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        orderDetail.order_id,
        orderDetail.product_id,
        orderDetail.quantity,
        orderDetail.price,
      ],
    );

    return from(order$).pipe(
      switchMap((order: any) => {
        return from(orderDetail$).pipe(
          map((orderDetail: any) => {
            return { order, orderDetail };
          }),
        );
      }),
    );
  }
}
