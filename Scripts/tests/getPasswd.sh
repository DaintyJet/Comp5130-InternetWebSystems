curl -X GET http://localhost:8081/api/passwd \
     -H "Content-Type: application/json" \
     -d '{
           "token": "'"$1"'",
           "tag": "57456s54"
         }'