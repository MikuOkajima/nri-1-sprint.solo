drop table payee;
drop table payment;
drop table users;

create table users (
    id serial primary key,
    name varchar (50) not null unique
);

create table payment(
    id serial primary key,
    payer_id integer not null references users (id),
    amount integer not null,
    purpose varchar (200),
    date timestamp
);

create table payee (
    id serial primary key,
    payment_id integer references payment (id),
    user_id integer not null references users (id)
);