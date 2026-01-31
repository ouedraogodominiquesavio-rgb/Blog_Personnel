/**
 * LOGIQUE GLOBALE DU BLOG PROFESSIONNEL
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Site chargé avec succès !");

    // 1. GESTION DE LA NAVIGATION ACTIVE
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });

    // 2. LOGIQUE DE LA PAGE INSCRIPTION & OTP
    const btnInscription = document.querySelector('.btn-submit');
    if (btnInscription) {
        btnInscription.addEventListener('click', ouvrirModalOTP);
    }
});

// --- FONCTIONS POUR L'INSCRIPTION ---

function ouvrirModalOTP() {
    const form = document.getElementById('formInscription');

    // Vérification si le formulaire est bien rempli
    if (form.checkValidity()) {
        document.getElementById('otpModal').style.display = 'flex';
        demarrerTimer(120); // Timer de 2 minutes
    } else {
        alert("Attention : Veuillez remplir tous les champs (Nom, Profession, Tel, etc.) avant de valider.");
        form.reportValidity();
    }
}

function fermerModalOTP() {
    document.getElementById('otpModal').style.display = 'none';
}

function confirmerPaiement() {
    const otpCode = document.getElementById('otpInput').value;

    // Simulation : On accepte n'importe quel code à 6 chiffres pour la démo
    if (otpCode.length === 6) {
        alert("✅ Paiement validé par OTP ! Vos informations sont envoyées à votre formateur.");

        // On soumet le formulaire vers Formspree (votre Gmail)
        document.getElementById('formInscription').submit();
    } else {
        alert("❌ Code OTP invalide. Veuillez entrer 6 chiffres.");
    }
}

// Petit timer pour le réalisme de la fenêtre OTP
function demarrerTimer(duree) {
    let timer = duree,
        minutes, seconds;
    const display = document.getElementById('time');

    const interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (display) display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            alert("Le code OTP a expiré. Veuillez recommencer.");
            fermerModalOTP();
        }
    }, 1000);
}

// --- LOGIQUE POUR LA BOUTIQUE ---

function ajouterAuPanier(nomProduit) {
    // Comme c'est un site statique, on redirige vers contact avec le nom du produit
    alert(nomProduit + " a été sélectionné. Redirection vers le formulaire de contact pour finaliser l'achat.");
    window.location.href = `contact.html?produit=${encodeURIComponent(nomProduit)}`;
}

// --- LOGIQUE POUR LE CONTACT ---

// Si on vient de la boutique, on remplit automatiquement le sujet
// Initialisation avec votre Public Key
(function() {
    emailjs.init("mVTlf-_tAIUopX8Do");
})();

const btn = document.getElementById('btn-envoyer');
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    btn.innerText = 'Envoi en cours...';
    btn.disabled = true;

    // Vos IDs EmailJS
    const serviceID = 'service_fupbf09';
    const templateID = 'template_zd39iu4';

    // Envoi du formulaire
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.innerText = 'Envoyer le Message';
            btn.disabled = false;
            alert('✅ Succès ! Votre message a été envoyé.');
            form.reset();
        }, (err) => {
            btn.innerText = 'Réessayer';
            btn.disabled = false;
            alert("❌ Erreur lors de l'envoi. Vérifiez votre connexion.");
            console.log('Détails erreur:', err);
        });
});