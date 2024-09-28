# CodeHub

-	Users create accounts, authenticate, post coding questions and engage in discussion via commenting.
-	Users can communicate with other users and also in Chatrooms via text or images or via video calls in real-time, implemented Socket IO and WebRTC, made scalable by caching of conversations opened in last 15minutes using Redis.
-	An Online Code Compiler and Contest Calender that informs about upcoming coding contest. 
-	Users can register as Educators and launch their courses by uploading videos and lecture notes and other users can purchase those courses using UPI payment gateway.
-	Contarization using Docker and deployed in cloud using Kubernetes ensuring scalability.


# Deployment 
 
-   The Server will be deployed on render and the client side will be deployed on vercel.
-   The Links will be added in due time


# Running on local system

-   First npm i all the dependencies
-   Next add a file in the server directory named .env (it should be exaclty .env)
-   Now add the following info in .env file:
    DB= <br/>
    PORT= <br/>
    ACCESS_TOKEN_SECRET= <br/>
    REFRESH_TOKEN_SECRET= <br/>
    ACCESS_TOKEN_EXPIRY= <br/>
    REFRESH_TOKEN_EXPIRY= <br/>
