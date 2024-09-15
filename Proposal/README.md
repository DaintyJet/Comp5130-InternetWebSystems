# Proposal: The Probably Secure Password Manager
This document contains Scratch notes regarding a proposal for the *Probably Secure Password Manager*.

## Introduction
Have you ever wanted to host your own password manager that is probably secure? Probably not, but this one is practical both inside and outside of a classroom. The main goal of this project is to create dockerized password manager that can be deployed locally that is not only secure, but can also be made insecure.

## Why
Students in a classroom, or in a workplace are always told the importance of passwords and securing the systems that we store them on. There also exist many Vulnerable by Design (VbD) applications used to teach students about software security. However, most of these applications like [WebGoat](https://owasp.org/www-project-webgoat/), [Metasploitable](https://github.com/rapid7/metasploitable3) or [Vulnserver](https://github.com/stephenbradshaw/vulnserver) fail to drive the point home to student that these vulnerabilities are in everyday applications that thousands or millions of people use!


 We introduce this full stack aplication in a series of docker containers that can be deployed on any network; this can be used for a practical purpose with all of the security flags enabled to provide secure password storage. Or we can disable various securityflags to introduce vulnerabilities into the applications. You may be wondering why we would want to introduce vulnerabilities into our **password manager**, and the question is Why Not! There are many viable passowrd manager already in circulation, both open and closed source, some of which are free such as [BitWarden]()  or those that are [LastPass](). These systems have one thing in common, they cannot easily be used in a classroom to show how one critical failure, or flaw can lead to a dat breack that can ruin a persons life. WE aim to provide this experiance for **free** in easy to use docker containers. 

# Why
This is a containerized program that can easily be deployed in learning enviornments for use by student, this is a program that can have the various compents created or toggeled at runtime to induce insecure, or bad behavior. For example we can allow students leanr about various web-security vulnerabilities..
