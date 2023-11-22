# mailer-backend

This project consists pf 2 small microservices in this repo, connected via an RPC (gRPC).

The api service is exposed externally and request requests from the /mail endpoint. This data is sanitised before it sends a request to the mailer service via a gRPC connection. The mailer services sole function is to take in some email inputs and send an email out using nodemailer.  

I have set up the project with dummy credentials from Mailtrap.io, making use of their free sandbox, in the config.ini files (in api and mailer). These can be substitutes for real or your own dummy credentials for testing. 

## Installing

To install run the following make commands to make sure all packages are installed and proto files generated
```
make install-dependencies generate-grpc-files
```

## Locally

To run locally you will need 2 terminals open

```
cd api
npm run start:api-server
```

```
cd mailer
npm run start:mailer-server
```


> **Note**
> 
> *While developing these can be ran using the `watch:<api/mailer>-server` for a faster feedback loop*

## Docker

TBC