# On utilise une image qui contient PHP et Nginx pré-configurés
FROM richarvey/php-nginx:latest

# On définit le répertoire de travail
WORKDIR /var/www/html

# On copie tout le contenu de ton projet dans le conteneur
COPY . .

# On expose le port 80 pour le web
EXPOSE 80

# On définit les variables d'environnement nécessaires pour PHP
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1