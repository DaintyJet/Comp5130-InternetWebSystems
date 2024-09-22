#! /bin/bash

# Check if root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as Root!"
    exit
fi
DB='PSPM'

echo "[!] Importing MongoDB GPG Key [!]"
apt-get -y install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

echo "[!] Setting up List File and Package DB [!]"
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt-get update -y

echo "[!] Installing MongoDB [!]"
apt-get install -y mongodb-org

echo "[!] Starting MongoDB [!]"
systemctl start mongod

echo "[!] Creating DB[!]"
mongosh --eval "use $DB"

echo "[!] Creating DB Admin[!]"
mongosh mongodb://127.0.0.1:27017/admin --eval 'db.createUser({
  user: "site_admin",
  pwd: "1qazxsW@1",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" },
    { role: "dbAdminAnyDatabase", db: "admin" },
    { role: "clusterAdmin", db: "admin" }
  ]
})'

echo "[!] Creating User PSPM[!]"
mongosh mongodb://127.0.0.1:27017/$DB --eval 'db.createUser({
  user: "admin",
  pwd: "admin_pass",
  roles: [
    { role: "readWrite", db: "PSPM" },  
    { role: "dbAdmin", db: "PSPM" },
    { role: "dbOwner", db: "PSPM" }
  ]
})'

echo "[!] Enabling Authorization [!]"
echo "WIP"
# sed '/security\n\tauthorization:.*disabled.*/security\n\tauthorization: enabled/g'

echo "[!] Install Node JS [!]"
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

. ~/.bashrc

# download and install Node.js (you may need to restart the terminal)
nvm install 20
# verifies the right Node.js version is in the environment
node -v # should print `v20.17.0`
# verifies the right npm version is in the environment
npm -v # should print `10.8.2`

npm -g install create-react-app

npm -g install express