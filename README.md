# SecurePay

**SecurePay** is a secure digital wallet application that allows users to manage and transfer funds effortlessly. With a strong focus on security and usability, it supports balance tracking, withdrawals, and peer-to-peer transfers through a clean and intuitive interface.

---

##  Features

*  User authentication (NextAuth)
*  Peer-to-peer transfers
*  Deposit and withdraw money
*  Protected API endpoints
*  Clean, responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

* **Frontend**: React (Next.js), Tailwind CSS
* **Backend**: Node.js, Next.js API routes
* **Authentication**: NextAuth.js
* **Database**: PostgreSQL
* **Deployment**: Vercel

---

##  Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/securepay.git
cd securepay
```

### 2. Install dependencies (root)

```bash
npm install
```

### 3. Add env to packages/db
```bash
DATABASE_URL= "local PostgreSQL url or get a new url from neon.tech or other providers"
```
### 3. Add env to apps/user-app
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_key
```

### 3. Bootstrap & run development

```bash
# Start all apps/packages in the Turborepo
npx turbo run dev
```

---


##  APIs

* **POST** `/api/withdraw`
  Withdraw funds from the user’s account.

* **POST** `/api/fetchBalance`
  Fetch the current user’s balance.

* **POST** `/api/transfer`
  Transfer funds to another user.

---

##  Future Enhancements

* End-to-end encryption for transactions
* Transaction history & analytics
* Two-factor authentication (2FA)
* Dark mode toggle

---

##  License

This project is licensed under the [MIT License](LICENSE).

---

##  Contributing

Pull requests and feedback are welcome! If you find a bug or want to request a feature, feel free to [open an issue](https://github.com/JoshiAarya/securepay/issues).
