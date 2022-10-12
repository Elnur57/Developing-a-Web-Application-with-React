import i18n from "i18next";
//npm install react-i18next i18next --save
import { initReactI18next } from "react-i18next";
//import { register } from 'timeago.js';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Username':'Username',
                'Display Name':'Display Name',
                password:'Password',
                'Password Repeat': 'Password Repeat' ,
                'Sign Up': 'Sign Up',
                'Password mismatch':'Password mismatch',
                'Sign In':'Sign In',
                Logout: 'Logout',
                "Home page": "Home page",
                "you name": "you name",
                "you display name": "you display name",
                Users: 'Users',
                Next: 'Next',
                Previous: 'Previous',
                'Load Failure': 'Load Failure',
                'User not found': 'User not found',
                Edit: 'Edit',
                Save: ' Save',
                Cancel: ' Cancel',
                'Change Display name': 'Change Display name',
                'My profile': 'My profile',
                'Write': 'Write',
                'There are no hoaxes': 'There are no hoaxes',
                'Load old hoaxes': 'Load old hoaxes',
                'There are new hoaxes': 'There are new hoaxes',
                'Delete Hoax':'Delete Hoax',
                'Are you sure to delete hoax?':'Are you sure to delete hoax?',
                'Delete My Account':'Delete My Account',
                'Are you sure to delete your account?':'Are you sure to delete your account?',
            }
        },
        az:{
            translations: {
                'Username':'İstifadəçi adı',
                'Display Name':'Görünən Ad',
                Password:'parol',
                'Password Repeat': 'Parolun təkrarlanması',
                "Sign Up": 'Qeydiyyatdan keçmək',
                'Password mismatch': 'Eyni şifrə deyil',
                'Sign In':'Daxil ol',
                Logout: 'Çıxış',
                "Home page": "Əsas səhifə",
                "you name": "sənin adın",
                "you display name": "ad göstərirsiniz",
                Users: 'İstifadəçilər',
                'Next >':'Növbəti >',
                '< Previous': '< Əvvəlki',
                'Load Failure': 'Yükləmə xətası',
                'User not found': 'İstifadəçi tapılmadı',
                Edit: 'Redaktə et',
                Save:' Yadda saxla',
                Cancel:'Ləğv edin',
                'Change Display name': 'Görünən adı dəyişdirin',
                'My profile':'Mənim Hesabım',
                'Write': 'Yaz',
                'There are no hoaxes': 'Hoax tapilmadı',
                'Load old hoaxes' : 'Köhnə hoaxesləri yükləyin',
                'There are new hoaxes':'Yeni hoaxes var',
                'Are you sure to delete hoax?':`Hoax'u silmək istəyirsiniz?`,
                'Delete Hoax':`Hoax'u sil`,
                'Delete My Account':'Hesabımı Sil',
                'Are you sure to delete your account?':'Hesabınızı siləcəyinizə əminsinizmi?',
            }
        }
    },
    //xeta bas verende hansi dilde yazilsin.
    fallbackLng: 'en',
    //sozler hardan alsin. birden cox translation ola bilerdi.
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    ract: {
        wait: true
    }
});

// const timeageAZ = (number, index) => {
//     return {
//       ['az önce', 'şimdi'],
//       ['%s saniye önce', '%s saniye içinde'],
//       ['1 dakika önce', '1 dakika içinde']
//       ['%s dakika önce', '%s dakika içinde'],
//       ['1 saat önce', '1 saat içinde']
//       ['%s saat önce', '%s saat içinde'],
//       ['1 gün önce', '1 gün içinde']
//       ['%s gün önce', '%s gün içinde'],
//       ['1 hafta önce', '1 hafta içinde']
//       ['%s hafta önce', '%s hafta içinde']
//       ['1 ay önce', '1 ay içinde'],
//       ['%s ay önce', '%s ay içinde']
//       ['1 yıl önce', '1 yıl içinde']
//       ['%s yıl önce', '%s yıl içinde'],
//     }[index];
// }
// register('az', timeageAZ);

export default i18n;
//index.js dosyanin icine import ele.