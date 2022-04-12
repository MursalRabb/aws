# Serverless Framework

## Getting Started

``` cmd
  npm install -g serverless
```

## Setting aws account on serverless

``` cmd
  serverless config credentials --provider aws --key AKIARB4BMJMNUUKH3QWK --secret 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 --profile mursal
```

## Creating a template

``` cmd
  serverless create --template aws-nodejs --path serverlessProject
```

## Adding profile to the provider in the yml file

``` yml
  provider:
  name: aws
  runtime: nodejs12.x
  profile: mursal
```

## Deploy everything in the folder

``` cmd
  sls deploy
```

## Adding an event

``` yml
  functions:
  getUser:
    handler: lambdas/getUser.handler
    events:
      - http:
          path: get-user/{ID}
          method: GET
          cors: true
```
