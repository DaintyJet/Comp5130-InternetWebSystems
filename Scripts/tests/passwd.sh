curl -X POST http://localhost:8081/api/passwd \
     -H "Content-Type: application/json" \
     -d '{
           "token": "'"$1"'",
           "share_list": [],
           "group": 0,
           "tag": "57456s54",
           "url": "hellso",
           "passwd": "EIs"
         }'