# Webová aplikace Flyte

![lyte__3_-removebg-preview](https://github.com/user-attachments/assets/87eb6fb5-6510-4b09-b192-260e14ce8932)
- [Video prezentace](https://www.youtube.com/watch?v=kYj456mgT_Y)
- [Backend](https://github.com/vmazurova/flyte_maturitni_projekt/tree/master/backend)
- [Frontend](https://github.com/vmazurova/frontend-mat)

## Popis projektu:

Můj maturitní projekt je webová aplikace určená pro fitness centrum, která usnadňuje správu uživatelů (členů) a umožňuje jim přístup k jejich osobním údajům, rezervacím, tréninkovým plánům a jídelníčkům. Aplikace je určena jak pro neznámé uživatele, kteří mohou provést rezervaci na zkušební lekci, tak pro stávající členy, kteří mohou spravovat svůj účet, sledovat pokroky a přihlašovat se na vedené kurzy. Trenéři mohou přidávat tréninkové a jídelní plány pro své klienty a administrátoři mají přístup ke správě všech uživatelů a kurzů.

Aplikace se zaměřuje na frontend vývoj, ale zahrnuje také základní backend logiku pro autentifikaci uživatelů, správu databáze a platební systémy.

### Funkce aplikace:
- **Landing Page**: Neznámí uživatelé mají možnost rezervovat si zkušební hodinu.
- **Registrace/Přihlášení**: Uživatelé se mohou registrovat a následně přihlásit do aplikace.
- **Osobní karta člena**: Členové mohou sledovat své osobní údaje jako váhu, výšku, BMI, a procento tělesného tuku.
- **Rezervace kurzů**: Možnost rezervovat si kurzy, které nabízejí trenéři, pomocí interaktivního kalendáře.
- **Platby**: Integrace s platebními systémy Stripe nebo PayPal pro nabití kreditu.
- **Tréninkové a jídelní plány**: Trenéři mohou členům přidělovat tréninkové plány a jídelníčky.
- **AI Chatbot**: Členové mohou používat AI chatbota pro získávání doporučení (volitelná funkce, pokud zbyde čas).

## Využité technologie

Aby byl projekt robustní a snadno spravovatelný, byly vybrány následující technologie:

#### Frontend:

- React.js: Pro vývoj interaktivního uživatelského rozhraní.
- Strapi API: Pro snadnou správu obsahu a komunikaci mezi frontendem a backendem.
- Tailwind CSS: Pro stylování a rychlý vývoj responzivního designu.

#### Backend:

- Strapi: Pro vytváření administrace, která umožňuje snadnou správu uživatelů, kurzů, tréninkových plánů a jídelníčků.

#### Databáze:

- SQLite: Použita pro ukládání všech dat spojených s uživateli, kurzy, tréninkovými plány a jídelníčky.

#### Platby:

- Stripe/PayPal: Pro integraci platebních systémů, kde členové mohou nabíjet kredit.

#### AI (volitelně):

- OpenAI API: Pro vytvoření chatbota, který bude poskytovat členům doporučení týkající se jídelníčků nebo cvičení.

## To-do list

### Návrh databáze a vývoj aplikace

- [x] **Návrh databázového modelu (ERA diagram)**
  - Navrhnout a vytvořit ERA diagram pro databázi, zahrnující entity jako Uživatelé, Kurzy, Rezervace, Platby, Tréninkové plány, a Jídelníčky.

- [x] **Nastavení vývojového prostředí**
  - [x] Nainstalovat a nastavit projekt v Node.js.
  - [x] Přidat React.js a Tailwind CSS pro tvorbu uživatelského rozhraní.
  - [x] Nastavit Strapi API pro backend a správu obsahu.
  - [x] Implementovat autentifikaci uživatelů přes Strapi.

- [x] **Vývoj základních funkcí**
  - [x] Vytvořit Landing Page s možností rezervace zkušební lekce.
  - [x] Implementovat registraci a přihlášení uživatelů přes Strapi.
  - [x] Vytvořit základní strukturu Osobní karty s údaji o členovi.
  - [x] Implementovat rezervační systém s kalendářem pro kurzy.
  - Připojit Stripe/PayPal pro platby a přidávání kreditu.

- [x] **Tréninkové a jídelní plány**
  - [x] Implementovat funkci pro vytváření a přiřazování tréninkových plánů trenéry.
  - [x] Implementovat funkci pro vytváření a přiřazování jídelníčků trenéry.

- [ ] **AI Chatbot (volitelné)**
  - Integrovat OpenAI API pro vytvoření AI chatbota pro doporučování jídelníčků a tréninků.

- [x] **Testování a ladění**
  - [x] Testovat všechny funkce aplikace a opravovat chyby.
  - [x] Zajistit, že aplikace je plně responzivní a funguje dobře na mobilních zařízeních.

- [x] **Nasazení**
  - [x] Nasadit aplikaci na platformu (např. Vercel, Netlify).
  - Ověřit, že platební systém a autentifikace fungují v produkčním prostředí.

- [x] **Dokumentace**
  - [x] Vytvořit podrobnou dokumentaci ke všem částem aplikace.
  - [x] Seznam použité technologie a postupy pro uživatelské role (admin, trenér, člen).

##  Reference: 
  - Tutorialy:
        - https://www.youtube.com/watch?v=4Ntd414raYc&list=PL4cUxeGkcC9h6OY8_8Oq6JerWqsKdAPxn
        - https://www.youtube.com/watch?v=ukiGFmZ32YA&t=766s
  - Strapi - https://docs.strapi.io/dev-docs/intro
  - React - https://react.dev/reference/react
  - Tailwind - https://tailwindui.com/documentation
  - FullCalendar - https://fullcalendar.io/
  - ApexCharts - https://apexcharts.com/
