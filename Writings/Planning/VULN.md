# Vulnerabilities
This document will note the possible vulnerabilities and how they can be enabled using the vulnerability API.

## Account Creation and Access.

**UID**: We make passwords visible depending on the UID of the given user. We can enable the registration function to examine a hidden UID field to determine if a UID has been provided and use that instead of the default creation method. We can also use a user creation API which will have a UID field (If the admin check is disabled for this, or the user got the admin password).

**Group**: We can make the account registration function examine a hidden field to determine what group the user should be a part of. Additionally we can have this set in the API, same issues as above.

## Logging
**Enable Debug Logging**: Extreme logging, includes sensitive information

**Open Logging APU**: Make API for accessing logs open to all

## Encryption
**HTTPS Only Cookies**: Cookies over HTTPS only or not.

**Login/Auth POST**: The login page served to users will make the forum use a POST or GET request to submit the information.

## Authentication
**Login off UID**: Hidden field UID may override the username

## NO SQL Injection
This would be on the vault page, you can print out all users or something.