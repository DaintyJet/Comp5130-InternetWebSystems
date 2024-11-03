# Vulns

Invalid
```
curl -X PATCH http://localhost:8081/api/vulns -H "Content-Type: application/json" -d '{
    "token": "12345",
    "v_tag": "v1.0",
    "v_toggle": "true",
    "v_body": "This is the new body content."
}'
```

Valid:
```
curl -X PATCH http://localhost:8081/api/vulns -H "Content-Type: application/json" -d '{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAyZGE5NmJmNTZmYzE3N2Q5YWRkM2QiLCJpYXQiOjE3MjgyNTIwOTgsImV4cCI6MTcyODI1NTY5OH0.WmTgqTHGalgL0ICEz7tIoR1pHdB6m_6IXgi5I5IieTo",
    "v_tag": "v1.0",
    "v_toggle": "true",
    "v_body": "This is the new body content."
}'
```
## Auth
Invalid
```
curl -X POST http://localhost:8081/api/auth -H "Content-Type: application/json" -d '{
    "username": "12345",
    "password": "v1.0"
}'
```

Valid
```
curl -X POST http://localhost:8081/api/auth -H "Content-Type: application/json" -d '{
    "username": "test",
    "password": "1234"
}'
```