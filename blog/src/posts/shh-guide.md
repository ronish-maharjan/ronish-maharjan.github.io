---
layout: post.njk
title: SSH (Last guide you need)
description: Dont be afraid to use ssh. 
date: 2026-07-16
tags:
  - posts
---

# secure shell (ssh)

ssh is a secure shell protocol that runs on port **22** and sometimes if in different environment its on **8022** like in tmux

## Important commands you must know

### Key generation

*   So its the first thing to do after installing ssh.
    
*   There are two type of key **ed25519** and **rsa** but use **ed25519** cause its secure compare to rsa.
    
    *   **How to generate the key**
        
        ```bash
            ssh-keygen -t ed25519 -C "write anythingto identify"
        ```
        
        > so here `-t` is for the key algorithm type.
        
        > `-C` is for comment so it is used to indentify the public key cause most generated key are same format and to indentify public key we use the comment.
        

> **note:** The ssh-keygen will generate **two files which are public and private keys** the pubic file will have **.pub** extension where as private doesn't have.

#### Difference between **private** and **pubilc** key

*   **Public key** are like the lock pad
    
*   To understand easily think it as a **talcha(Lock pad )** so we add that **public key** to **lock** which in case is **server** so we just add the key in **authorized\_key** file.
    
*   Its just an asumption that we assume it as lockpad to understand easily.
    
*   **Private key** are the actual key for the lockpad
    
*   Like each lock have different key same goes here every public key have different privatekey.
    

#### How does it work

*   To understand how ssh work we need to know about **ssh daemon(sshd)**
    
*   Its a background process that listen for any ssh connection
    
*   When we try to use ssh command to connect the sshd first check if the server have the public key for the provided ssh private key if its there then only authorized other wise cant access.
    
*   once it is authorized it create a tty session which provide a remote terminal.
    

> **Note** The public key should be in the **authorized\_key file** not like usual file in ./ssh/edu.pub.

### SSh connection

*   To connect with ssh we need the server **ipaddress,user, hostname, port** if modified
    

```bash
ssh -i private_key_path -p <port> user@hostname
```

> \-i stands for identity-file -p stands for port user is the actual user you want to login hostname is the ipaddress

#### Config File

*   There is **Config** file we can create inside the **.ssh** folder
    
*   Its used to automate the long command we type for connecting on the server like on above bash command.
    
*   The file is in this format
    

```bash
host <anything> // this is the name that u used to connect like ssh <anything> 
    hostname <ipaddress>
    user <user to login> 
    port <which port sshd is listening to>
    IdentityFile <path to private ssh key>
    ConnectTimeout <time>  // used to timeout automatically after given time so that it doesnt continuously try to connect
```

### Copy file using scp

*   We can also send file from our **local** to **server** using scp command.
    
*   Command format is like:
    

```bash
scp -i <private_key_path> -P <port> "file_path_to_send" user@hostname:<server_path_to_save>
```

> **Note** Here its **\-P not -p** remember.

### Copy the public key directly

*   We can directly copy the ssh public key without any problem
    
*   Only problem is PasswordAuthentication should be enabled first
    

```bash
ssh-copy-id -i <path_to_public_key> user@hostname
```

> **Note** Require password login enabled

> **Key Notes**

*   **ServerAliveInterval**: used to send small packet on given time so that ssh connection doesnt dies.`ServerAliveInterval 60` sends every 60 second
    
*   **ServerAliveCountMax**: how many times it should send the alive packet `ServerAliveCountMax 10`
