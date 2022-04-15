# musala-gateway-api
## Installation guide
## Configuration setup
* git clone
* cd to your working dir
* run npm install 
### Configure Mongo DB
* open .env file
* change the URL to your mongodb URL
### Run the Server
* npm start
### Run Test Case
* npm test
### API End Points and Descriptions
#### Gateway API
ENDPOINTS  | METHOD | SAMPLE INPUT DATA 
------------- | ------------- | ----------
http://localhost:8000/api/gateways/register  | POST | {"name": "gateway101", "ipv4": "172.16.254.9", "serialNumber": "12345"}
http://localhost:8000/api/gateways/  | GET | 
http://localhost:8000/api/gateways/find/{gatewayID}  | GET | 

#### Device API
ENDPOINTS  | METHOD | SAMPLE INPUT DATA 
------------- | ------------- | ----------
http://localhost:8000/api/devices/register  | POST | {"uid": "101", "vendor": "HP", "gatewayId": gatewayID}
http://localhost:8000/api/devices/  | GET | 
http://localhost:8000/api/devices/find/{deviceID}  | GET |
http://localhost:8000/api/devices/{deviceID}  | DELETE |

#### Note
* Github Actions was used for CI and automated build
* Jest was used for writing test cases
* You can use both online and offline mongoDB



