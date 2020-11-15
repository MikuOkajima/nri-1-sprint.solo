# Split Bill API
このリポジトリはCode Chrysalisの生徒であるときに作成しました（This was created during my time as a student at Code Chrysalis）

## Overview

- 割り勘計算用API。ユーザと明細を登録して、各ユーザの支払い金額を計算する。

## API endpoints

### /users

- property
  - id: ユーザid (自動付与)
  - name: ユーザの名前

#### GET /users

- ユーザ一覧を取得
- Response:   
```json
[
  {"id": 1, "name": "Akira"},
  {"id": 2, "name": "Kaneda"},
  ...
]
```

#### POST /users

- ユーザを登録
- Request:  
```json
{"name": "Yamagata"}
```
- Response:
```json 
{"id": 5, "name": "Yamagata"}
```
#### DELETE /users/:userName

- ユーザを削除
- URI:  
/users/Yamagata

### /transactions

- property
  - id: 明細id (自動付与)
  - amount: 支払金額
  - purpose: 用途
  - payer: 支払ったユーザの名前
  - payees: 支払ってもらったユーザの名前
  - date: 明細登録日時 (自動付与)


#### GET /transactions

- 明細一覧を取得
- Response:   
```json
[  
  {
    "id": 1,
    "amount": 1000,
    "purpose": "lunch",
    "date": "2020-11-15 14:46:55",
    "payer": "Akira",
    "payees": [
      "Akira",
      "Kei",
      "Kaneda"
    ]
  },
  ...
]
```

#### GET /transactions/:transactionId

- 明細一覧を取得
- URI:  
/transactions/1
- Response:   
```json
{
  "id": 1,
  "amount": 1000,
  "purpose": "lunch",
  "date": "2020-11-15 14:46:55",
  "payer": "Akira",
  "payees": [
    "Akira",
    "Kei",
    "Kaneda"
  ]
}
```


#### POST /transactions

- 明細を登録
- Request:  
```json
{
  "payer": "Akira",
  "amount": 3500,
  "purpose": "dinner",
  "payees": ["Akira", "Tetsuo", "Kaneda"]
}
```
- Response: 
```json
{
  "payer": "Akira",
  "amount": 3500,
  "purpose": "dinner",
  "id": 1,
  "date": "2020-11-15 15:23:47",
  "payees": [
    "Akira",
    "Tetsuo",
    "Kaneda"
  ]
}
```


#### PATCH /transactions/:transactionId

- 明細を修正
- URI:  
/transactions/1
- Request:  
  - 修正するpropertyを指定する。修正しないpropertyは指定不要。
```json
{
  "payer": "Tetsuo",
  "purpose": "breakfast",
  "payees": ["Tetsuo", "Kaneda"]
}
```
- Response:  
```json
{
  "id": 1,
  "payer": "Tetsuo",
  "amount": 3500,
  "purpose": "breakfast",
  "date": "2020-11-15 15:23:47",
  "payees": [
    "Tetsuo",
    "Kaneda"
  ]
}
```
#### DELETE /transactions/:transactionId

- 明細を削除
- URI:  
/transactions/1

### /balance

- property
  - user: ユーサの名前
  - balance: 清算金額。正値は受取の、負値は支払の金額。
  - debit: 借方金額
  - credit: 貸方金額

#### GET /balancec

- 全ユーザの清算情報を取得
- Response:  
```json
[
  {
    "user": "Akira",
    "balance": 7002,
    "debit": 3498,
    "credit": 10500
  },
  {
    "user": "Kaneda",
    "balance": -3648,
    "debit": 3648,
    "credit": 0
  }, 
  ...
]
```