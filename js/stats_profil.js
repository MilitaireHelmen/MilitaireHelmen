var _profilstats_img = new Image(1, 1);
function _profilstats()
{

	if (typeof profil_id_skynaute == 'undefined' || !profil_id_skynaute) return;
	if (typeof profil_pseudo == 'undefined') return;
	if (typeof www_path == 'undefined') return;
	if (typeof dont_stat != 'undefined' && dont_stat == 1) return;
	if (typeof careful_with_that_axe_eugene == 'undefined') return;
	
	var document_domain = document.domain; 
	if (typeof _document_domain_b4_sm != 'undefined') 
	{ 
		document_domain = _document_domain_b4_sm; 
	}
	
	// le a& ne sert a rien a part avoir une idée de quel version est utilisé.
	var _S = www_path + "profil/gifstats.php?v5=42&";

	// domaines autorisés pour les stats à mettre en minuscules 
	var listedomaine = new Array('skyrock.com', 'skyblog.com', 'nakama.fr', 'orbus.fr', 'biki.fr'); 
 
	var domaine_ok = 0; 
	// FIXME : on doit pouvoir ecrire une regexp 
	var onedomaine = document_domain.substring(document_domain.lastIndexOf(".", document_domain.lastIndexOf(".") - 1) + 1, document_domain.length); 
	onedomaine = onedomaine.toLowerCase(); 

	for (var cpt = 0; cpt < listedomaine.length; cpt = cpt + 1) 
	{ 
		if (listedomaine[cpt].toLowerCase() != onedomaine) 
			continue; 
		domaine_ok = 1; 
		break; 
	} 
	
	if (!domaine_ok) return; 

	// test si cookies actifs 
	var _K = (navigator.cookieEnabled ? 1 : 0); 
	if (!_K) return; 

	// détermination de l'expiration 
	var _Exp = new Date(); 
	_Exp.setTime(_Exp.getTime() + (30*60*1000)); 

	// autre test de cookie 
	var _KD = 0; 
	document.cookie = "skyprofilstat=y; expires=" + _Exp.toGMTString(); 
	_KD = (document.cookie.indexOf("skyprofilstat=y") != -1 ? 1 : 0); 
	if (!_KD) return; 

	// reset de ce faux cookie 
	document.cookie = "skyprofilstat=; expires=Fri, 02 Jan 1970 00:00:00 GMT"; 

	// on vérifie que ce profil n'a pas déja été visité dans les 30 dernières minutes 
	var _KD2 = (document.cookie.indexOf("Skyprofilstats2=") != -1 ? 1 : 0); 

	// on prolonge de 30 minutes 
	document.cookie = "Skyprofilstats2=y; expires=" + _Exp.toGMTString() + "; path=/; domain=" + document_domain; 

	if (_KD2) return; 	
	var _R = escape(window.document.referrer);
	if (_R == 'undefined' || _R == '')
		_R = '';

	// appel de l'image
	_profilstats_img.src = _S + 'pseudo=' + escape(profil_pseudo) + '&id_skynaute=' + escape(profil_id_skynaute)  + '&r=' + _R + '&n=' + Math.round(Math.random() * 1000000000) + '&k=' + escape(careful_with_that_axe_eugene);
}