========================================================================================

# IF YOU RUN INTO ANY ISSUES, PLEASE REACH OUT FOR ASSISTANCE IN RUNNING THE APPLICATION. 

========================================================================================


# VCP-Take-Home
The following project and code is written for Veraleo Capital Partners take home. In side you will find three aspects of the project that demostrate and build a basic api service. 

To get started: 

1. Download and clone the repository. 
2. In command line, run 'npm i express' to install express on node.js
    **The application should run without worries after installing express, but if there are any issues, here are the dependencies that I installed. **
            - npm i 
            - cheerio 
            - he 
            - node-fetch
3. To start server, run 'npm start' in local terminal. 
    - Application should spin up on port 3000
4. I ran all tests off of "Postman" so I will give instructions geared towards that as some specifics had to be correct for return. 
    - Challenge 1: 
        -localhost:3000/check
        -set method to get
        -expected return reads: { "Creator": "Tanner Lyon" }
    
    -Challenge 2: 
        - localhost:3000/search
        - set method to post
        - click on 'Body' to add query information 
        - change style to 'raw'
        - change format to 'JSON' 
        - in body paste JSON query -  { "query": "Facebook" }, {"query": "Amazon" }, { "query":"Guitar" }, { "query":"Fly Fishing" }
            -expected return: 
                {
                    "numberOfHits": 97913,
                    "firstHit": "Facebook is an online social media and social networking service owned by American technology giant Meta Platforms. Created in 2004 by Mark Zuckerberg"
                }

    -Challenge 3: 
        -localhost:3000/marketResearch
        - set method to post
        - click on 'Body' to add query information 
        - change style to 'raw'
        - change format to 'JSON' 
        - in body paste JSON query 
            -   {
                 "symbols": ["AAPL", "GOOGL", "AMZN", "TTOO" ]
                }

            -expected return: 
                {
                    "overall": "Market health for given stocks is Neutral",
                    "stocks": [
                        {
                            "longName": "Apple Inc.",
                            "symbol": "AAPL",
                            "status": "Neutral",
                            "highPercentage": -9.776522221661704,
                            "lowPercentage": 44.03640170733671
                        },
                        {
                            "longName": "Alphabet Inc.",
                            "symbol": "GOOGL",
                            "status": "Neutral",
                            "highPercentage": -2.733323891800018,
                            "lowPercentage": 64.81881449484042
                        },
                        {
                            "longName": "Amazon.com, Inc.",
                            "symbol": "AMZN",
                            "status": "Neutral",
                            "highPercentage": -11.017413958590442,
                            "lowPercentage": 59.38843178189855
                        },
                        {
                            "longName": "T2 Biosystems, Inc.",
                            "symbol": "TTOO",
                            "status": "Neutral",
                            "highPercentage": -21.60611854684514,
                            "lowPercentage": 15085.185185185184
                        }
                    ]
                }