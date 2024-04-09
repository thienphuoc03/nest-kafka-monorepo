-- enum types
create type role_name as enum ('ADMIN', 'USER');

create type order_status as enum ('PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED');


-- create tables
create table roles (
  id serial primary key,
  name role_name not null default 'USER',
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table users (
  id serial primary key,
  name varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp,
  role_id integer not null references roles(id) on delete cascade on update cascade
);

create table products (
  id serial primary key,
  name varchar(100) not null,
  description text not null,
  image_url text not null,
  price integer not null,
  quantity integer not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table orders (
  id serial primary key,
  user_id integer not null references users(id) on delete cascade on update cascade,
  total_amount integer not null,
  status order_status not null default 'PENDING',
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table order_detail (
  id serial primary key,
  order_id integer not null references orders(id) on delete cascade on update cascade,
  product_id integer not null references products(id) on delete cascade on update cascade,
  amount integer not null,
  quantity integer not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

