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

    req = requests.post("{}/v1/upload_document".format(SERVER_ADDRESS),  data= data, headers= headers)
    print(req)
    print(req.text)

    with open("/tmp/document_id", "w") as f:
        f.write(req.text.strip().replace('"',''))


elif sys.argv[1] == "download":
    token_file = open("/tmp/login_token", "r")
    headers = {"Login-Token": token_file.read()}
    token_file.close()

    document_id_file = open("/tmp/document_id", "r")
    req = requests.get("{}/v1/get_document/{}".format(SERVER_ADDRESS, document_id_file.read()), headers= headers)
    document_id_file.close()

    with open("test.pdf", "wb") as f:
        f.write(req.content)

    print(req)

else:
    print("unrecoginzed action {}".format(sys.argv[1]))
