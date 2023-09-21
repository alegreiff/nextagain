import Link from 'next/link'
import React from 'react'

const HeaderNavigation = () => {
    return (
        <div className='bg-[#193d8a] p-4 text-2xl text-white font-bold flex justify-start'>
            <Link className="btn btn-ghost p-1 m-1" href="/">Datos generales</Link>
            <Link className="btn btn-ghost p-1 m-1" href="/users/leaf">Origen visitas</Link>

            {/* <Link className="btn btn-ghost p-1 m-1" href="/users/mapa">Mapa</Link>
            <Link className="btn btn-ghost p-1 m-1" href="/users">Usuarios</Link>
            <Link className="btn btn-ghost p-1 m-1" href="/users/new">Demo</Link> */}
        </div>
    )
}

export default HeaderNavigation


/* 

a:28:{i:0;s:41:"acf-to-rest-api/class-acf-to-rest-api.php";i:1;s:50:"admin-ajax-search-in-backend/admin-ajax-search.php";i:2;s:34:"advanced-custom-fields-pro/acf.php";i:3;s:19:"akismet/akismet.php";i:4;s:29:"appendpoints/appendpoints.php";i:5;s:63:"bp-disable-activation-reloaded/bp-disable-activation-loader.php";i:6;s:24:"buddypress/bp-loader.php";i:7;s:36:"cleantalk-spam-protect/cleantalk.php";i:8;s:29:"customretina/customretina.php";i:9;s:33:"genesis-blocks/genesis-blocks.php";i:10;s:33:"google-captcha/google-captcha.php";i:11;s:36:"google-sitemap-generator/sitemap.php";i:12;s:47:"jwt-authentication-for-wp-rest-api/jwt-auth.php";i:13;s:33:"kadence-blocks/kadence-blocks.php";i:14;s:23:"metricool/metricool.php";i:15;s:37:"personas-backend/personas-backend.php";i:16;s:35:"responsive-menu/responsive-menu.php";i:17;s:31:"retinasalidas/retinasalidas.php";i:18;s:43:"shortcodes-ultimate/shortcodes-ultimate.php";i:19;s:43:"simple-social-icons/simple-social-icons.php";i:20;s:37:"super-socializer/super_socializer.php";i:21;s:41:"transients-manager/transients-manager.php";i:22;s:25:"user-menus/user-menus.php";i:23;s:29:"webp-express/webp-express.php";i:24;s:27:"wp-crontrol/wp-crontrol.php";i:25;s:29:"wp-mail-smtp/wp_mail_smtp.php";i:26;s:29:"wp-rest-user/wp-rest-user.php";i:27;s:24:"wpforms-lite/wpforms.php";}

*/


/* 

a:27:{i:0;s:41:"acf-to-rest-api/class-acf-to-rest-api.php";i:1;s:50:"admin-ajax-search-in-backend/admin-ajax-search.php";i:2;s:34:"advanced-custom-fields-pro/acf.php";i:3;s:19:"akismet/akismet.php";i:4;s:29:"appendpoints/appendpoints.php";i:5;s:63:"bp-disable-activation-reloaded/bp-disable-activation-loader.php";i:6;s:24:"buddypress/bp-loader.php";i:7;s:36:"cleantalk-spam-protect/cleantalk.php";i:8;s:29:"customretina/customretina.php";i:9;s:33:"genesis-blocks/genesis-blocks.php";i:10;s:36:"google-sitemap-generator/sitemap.php";i:11;s:47:"jwt-authentication-for-wp-rest-api/jwt-auth.php";i:12;s:33:"kadence-blocks/kadence-blocks.php";i:13;s:23:"metricool/metricool.php";i:14;s:37:"personas-backend/personas-backend.php";i:15;s:35:"responsive-menu/responsive-menu.php";i:16;s:31:"retinasalidas/retinasalidas.php";i:17;s:43:"shortcodes-ultimate/shortcodes-ultimate.php";i:18;s:43:"simple-social-icons/simple-social-icons.php";i:19;s:37:"super-socializer/super_socializer.php";i:20;s:41:"transients-manager/transients-manager.php";i:21;s:25:"user-menus/user-menus.php";i:22;s:29:"webp-express/webp-express.php";i:23;s:27:"wp-crontrol/wp-crontrol.php";i:24;s:29:"wp-mail-smtp/wp_mail_smtp.php";i:25;s:29:"wp-rest-user/wp-rest-user.php";i:26;s:24:"wpforms-lite/wpforms.php";}
*/