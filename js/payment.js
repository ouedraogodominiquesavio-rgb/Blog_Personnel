function ouvrirModalOTP() {
    const form = document.getElementById('formInscription');
    if (form.checkValidity()) {
        document.getElementById('otpModal').style.display = 'flex';
    } else {
        alert("Veuillez remplir correctement tous les champs.");
    }
}

function fermerModalOTP() {
    document.getElementById('otpModal').style.display = 'none';
}

function confirmerPaiement() {
    const code = document.getElementById('otpInput').value;
    if (code.length === 6) {
        alert("Paiement validé avec succès ! Vos informations sont en cours d'envoi à votre formateur.");
        // Envoi effectif du formulaire vers Gmail
        document.getElementById('formInscription').submit();
    } else {
        alert("Veuillez entrer un code valide à 6 chiffres.");
    }
}