# NBA API

This is a simple api, fully configured to the REST specification for Creating, Reading, Updating and Deleting resource(s) at the specified routes.

## Authors

- [@IfedayoAdeniyi](https://github.com/Adeniyii)

## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Acknowledgements

- [Zuri Training](https://zuri.team/)
- [Awesome README](https://github.com/matiassingers/awesome-readme)

## Hosting

This project is hosted at

[https://nba-crud-app.herokuapp.com](https://nba-crud-app.herokuapp.com)

## API Reference

#### Get all players

```http
  GET /api/players
```

#### Get player

```http
  GET /api/players/${id}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of player to fetch |

#### Add player

```http
  POST /api/player/
```

| Body      | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `name`    | `string` | **Required**. Name of player to add    |
| `email`   | `string` | **Required**. Email of player to add   |
| `country` | `string` | **Required**. Country of player to add |

#### Update player

```http
  PUT /api/player/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of player to update |

| Body      | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `name`    | `string` | **Optional**. updated name of player    |
| `email`   | `string` | **Optional**. updated email of player   |
| `country` | `string` | **Optional**. updated country of player |

#### Delete player

```http
  DELETE /api/player/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of player to delete |

## Features

- Add a player
- Get all players
- Get a single player
- Update a single player
- Delete a single player

## Run Locally

Clone the project

```bash
  git clone https://github.com/Adeniyii/CRUD-APP.git
```

Go to the project directory

```bash
  cd CRUD-APP
```

Install dependencies

```bash
  yarn install
```

Compile to javascript

```bash
  yarn run build
```

Start the server

```bash
  yarn run start
```
