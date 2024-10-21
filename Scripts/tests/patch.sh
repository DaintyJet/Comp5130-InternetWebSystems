curl -X PATCH http://localhost:8081/api/vulns \
     -H "Content-Type: application/json" \
     -d '{
           "token": "'"$1"'",
           "v_tag": "1",
           "v_toggle": "0",
           "v_body": "hello"
         }'