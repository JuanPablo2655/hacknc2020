import requests, sys, json

SERVER_ADDRESS = "http://localhost:8000"
USERNAME = "test_username"
PASSWORD = "password"
EMAIL = "test@email.com"

if sys.argv[1] == "signup":
    token = sys.argv[2]
    signup_json = {
        "username": USERNAME,
        "password": PASSWORD,
        "email": EMAIL,
        "token": token,


        }
    req = requests.post("{}/v1/signup".format(SERVER_ADDRESS), json = signup_json)
    print(req)
    print(req.text)
elif sys.argv[1] == "login":
    login_json = {
        "email": EMAIL,
        "password": PASSWORD,
    }
    req = requests.post("{}/v1/login".format(SERVER_ADDRESS), json = login_json)
    print(req)
    print(req.text)
    with open("/tmp/login_token", "w") as f:
        f.write(req.json()["token"].strip())
elif sys.argv[1] == "upload":
    token_file = open("/tmp/login_token", "r")
    headers = {'Content-Type': 'text/plain', "Login-Token": token_file.read()}
    token_file.close()
    
    upload_file = open(sys.argv[2], "rb")
    data = upload_file.read()
    upload_file.close()

    req = requests.post("{}/v1/upload_document".format(SERVER_ADDRESS), data=data, headers= headers)
    print(req)
    print(req.text)

else:
    print("unrecoginzed action {}".format(sys.argv[1]))
