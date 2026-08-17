---
layout: post.njk
title: How DNS Works
description: Understanding DNS from a backend developer's perspective.
date: 2026-08-16
tags:
  - posts
---
>**Status: Ongoing**

# **What is DNS?**

In simple term DNS is just a collection of normal server that store only record of domain name and its associative servers ip **mapped** to it.

> **Note:** DNS server are also know as **nameservers** so dont be confused.

Each server have it's own task to perform.

## Things You should know before moving on this blog
1. DNS Resolver
2. Delegation
3. Tree structure 
4. Domain Name
5. DNS Records

## The DNS Hierarchy: The Inverted Tree

Before we dive into what each server does, you need to understand how the DNS system is structured.
DNS is not a single database, like a single giant phonebook. If its like that and were updating, it would be a nightmare and one server would have to hold billions of records. Instead the DNS is organized as a hierarchical inverted tree structure.

You may ask why we call it an **inverted tree**. It’s because the root node is at the top, while the branches extend downward. This is the conventional way we visualize trees in computer science.

> **Fun fact:** The DNS hierarchy is similar to the Unix file system: both are hierarchical trees.

Visualizing the Tree:
Here is a simple view of how the tree looks:

![DNS-hierarchy compared with unix file system](/assets/dns-hierarchy.png)
*Figure 1: Comparision of DNS hierarchy with unix file system.*

![DNS-hierarchy-Flow](/assets/dns-hierarchy-1.png)
*Figure 2: Flow of DNS hierarchy structure*

Notice the key difference in how they are written. In Unix file systems, you
start at the root `/` and go down to the specific file `/home/user/blog.md`. In
DNS you write the specific host first and the root last
`www.example.com.`. Even though we write it left-to-right (from leaf to root),
the DNS server actually resolves it in reverse—starting at the root `.` and
working its way down the tree to find the specific host."

lets now understanding what are the different servers involved in dns and how it works.
There are mainly **4 types** of DNS Servers

* **Root Server**
* **Top Layer Domain server (TLD)**
* **Authoritive Server**
* **Recursive Resolver server**


## Detail Overviews on each servers
Each DNS server stores DNS resource records that map names to information. For simplicity, we can imagine some of them as key-value pairs:
`[domain-name] -> [server/IP information]`
However, the actual DNS data is more complex than a simple key-value database.

### Root Server 
Root DNS servers are responsible for directing queries toward the appropriate Top-Level Domain (TLD) servers.
They do not store information about individual domains such as:
`ronishmaharjan.info.np`
Instead, the root zone contains information about TLDs such as:

```
.com -> .com TLD name servers
.net -> .net TLD name servers
.org -> .org TLD name servers
.np ->  .np TLD name servers
```

So conceptually:
`[TLD] -> [TLD nameserver information]`

The root servers don't necessarily return a single IP address. They normally return NS records and associated information that tell the resolver which TLD nameservers to contact.

> **Fun fact:** The root server system is traditionally identified by the
> letters A–M, giving 13 root-server identities, such as a.root-servers.net,
> b.root-servers.net, etc. Each identity is served by multiple physical
> instances around the world using anycast.

### Top Layer Domain (TLD) Server

The TLD server is responsible for storing information about the domains registered under its TLD.
For example, if you register `example.com`, the `.com` TLD server does **not** store the actual IP address of `www.example.com`. Instead, it stores the **authoritative nameservers responsible for `example.com`**.

Conceptually, we can think of the TLD data like this:

`example.com -> ns1.example-dns.com, ns2.example-dns.com`

A domain can have **multiple authoritative nameservers** for redundancy and availability. If one authoritative server becomes unavailable, another can still answer DNS queries.
The actual DNS records are stored on those authoritative nameservers.
So the TLD server essentially tells us:

**"I don't know the IP address of `www.example.com`, but I know which authoritative nameservers are responsible for `example.com`. Ask them."**

The authoritative server then provides the actual DNS record:

`www.example.com → 192.0.2.10`

> **Note:** Each TLD has its own set of TLD nameservers that hold delegation information for the domains under that TLD, including the authoritative nameservers responsible for those domains.

### Authoritive Server
The authoritative DNS server stores the actual DNS records for a domain. Unlike a TLD server, which only handles domains under a particular TLD such as .com, an authoritative DNS server can contain records for the mulitple tld domains it is responsible for, regardless of the TLD.
For example, an authoritative DNS server might contain:

example.com -> 93.184.216.34

example.net -> 93.184.216.35

These records can map hostnames to IP addresses using A records (IPv4) or AAAA records (IPv6).

**Key point to remember:** 
When ever we are talking about changing the dns server we are actually changing the authoritive server for hosting our domain information. This server are actually changable and configurable by us for our domain. 
Some popular authoritative DNS services provider are **Cloudflare** and **Google Cloud DNS**`

you can manage its DNS records from the domain name provider dashboard below is the cloudflare dashboard. Cloudflare
provides authoritative nameservers for your domain, which serve these DNS
records to DNS resolvers.

![Configuring domain in cloudflare](/assets/configuring-domain.png) 
*Figure 3: Configuring a DNS record in Cloudflare's authoritative DNS service*
