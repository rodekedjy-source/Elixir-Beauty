# 🌿 Elixir Beauty — Booking Site

Site de réservation en ligne pour Elixir Beauty.

---

## 🚀 Mise en ligne — Étape par étape

### ÉTAPE 1 — Créer la base de données (Supabase)

1. Va sur **https://supabase.com** → "Start for free"
2. Crée un compte (avec Google c'est plus rapide)
3. Clique **"New project"**
   - Nom : `elixir-beauty`
   - Choisis un mot de passe (note-le)
   - Région : `East US` (ou Canada si dispo)
4. Attends ~2 minutes que le projet se crée
5. Va dans **SQL Editor** (menu gauche) → clique **"New query"**
6. Copie-colle ce code et clique **Run** :

```sql
create table bookings (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamptz default now(),
  name        text not null,
  phone       text,
  email       text,
  notes       text,
  service     text not null,
  service_id  text,
  date        text not null,
  time        text not null,
  status      text default 'pending',
  ai_message  text default ''
);

-- Permettre à l'app de lire/écrire sans login
alter table bookings enable row level security;
create policy "public access" on bookings for all using (true) with check (true);
```

7. Va dans **Settings → API** (menu gauche)
   - Copie le **Project URL** → c'est ton `SUPABASE_URL`
   - Copie le **anon public key** → c'est ton `SUPABASE_ANON_KEY`

---

### ÉTAPE 2 — Mettre le code sur GitHub

1. Va sur **https://github.com** → crée un compte
2. Clique **"New repository"**
   - Nom : `elixir-beauty`
   - Laisse tout par défaut → **Create repository**
3. Télécharge **GitHub Desktop** sur https://desktop.github.com
4. Ouvre GitHub Desktop → **Clone** ton repo
5. Copie tous les fichiers du projet dans le dossier cloné
6. Dans GitHub Desktop → **Commit** → **Push**

---

### ÉTAPE 3 — Déployer sur Vercel

1. Va sur **https://vercel.com** → "Sign up with GitHub"
2. Clique **"Add New Project"** → sélectionne `elixir-beauty`
3. Avant de cliquer Deploy, clique **"Environment Variables"** et ajoute :
   - `VITE_SUPABASE_URL` = ton URL Supabase (ex: `https://abcdef.supabase.co`)
   - `VITE_SUPABASE_ANON_KEY` = ta clé anon Supabase
4. Clique **Deploy** → attends 1-2 minutes
5. Vercel te donne une URL comme `elixir-beauty.vercel.app` 🎉

---

### ÉTAPE 4 — Acheter un vrai domaine (optionnel, ~12$/an)

1. Va sur **https://namecheap.com**
2. Cherche `elixirbeauty.com` ou `elixirbeauty.ca`
3. Achète-le
4. Dans Vercel → ton projet → **Settings → Domains**
5. Ajoute ton domaine → Vercel te dit quoi configurer dans Namecheap
6. Ça prend ~10 min à activer

---

### ÉTAPE 5 — Être trouvable sur Google

1. Va sur **https://business.google.com**
2. Crée ta fiche "Elixir Beauty"
   - Mets ton adresse, tes heures, tes photos
   - Dans le champ "Site web" → mets l'URL Vercel ou ton domaine
3. Google te vérifie par courrier postal (carte avec code) en ~1 semaine
4. Une fois vérifié → tu apparais dans Google Maps et les recherches locales

---

### ÉTAPE 6 — Instagram bio

1. Ouvre Instagram → ton profil → **Modifier le profil**
2. Dans le champ **"Site web"** → colle ton URL (ex: `elixirbeauty.vercel.app`)
3. Sauvegarde
4. Maintenant dans chaque post, tu peux dire **"Lien en bio pour réserver 👆"**

---

## 📱 Comment elle utilise le dashboard

- Le site est public — les clients peuvent le trouver sur Google ou via son Instagram
- Elle ouvre le même site sur son téléphone → bouton **🔑 Owner** en bas à droite
- Les nouvelles réservations apparaissent **en temps réel** (pas besoin de rafraîchir)
- Elle clique **Confirm** ou **Decline**
- Le message WhatsApp s'ouvre automatiquement avec le texte déjà écrit → elle tape juste **Envoyer**

---

## 🛠 Dev local (pour modifier le site)

```bash
npm install
cp .env.example .env
# Remplis .env avec tes clés Supabase
npm run dev
```

Le site s'ouvre sur http://localhost:5173
