<?php
defined('ABSPATH') || die();
/** @var $this NextendSocialProviderAdmin */

$provider = $this->getProvider();
?>
<div class="nsl-admin-sub-content">
    <?php if (substr($provider->getLoginUrl(), 0, 8) !== 'https://') { ?>
        <div class="error">
            <p><?php printf(__('%1$s allows HTTPS OAuth Redirects only. You must move your site to HTTPS in order to allow login with %1$s.', 'nextend-facebook-connect'), $provider->getLabel()); ?></p>
            <p>
                <a href="https://social-login.nextendweb.com/documentation/providers/facebook/#enforce-https" target="_blank"><?php _e('How to get SSL for my WordPress site?', 'nextend-facebook-connect'); ?></a>
            </p>
        </div>
    <?php } else {
        $this->renderGettingStartedHead();
        ?>

        <ul>
            <li>
                <b>Valid OAuth redirect URIs:</b>
                <ul class='nsl-list-disc'>
                    <?php
                    $loginUrls = $provider->getAllRedirectUrisForAppCreation();
                    foreach ($loginUrls as $loginUrl) {
                        echo "<li>" . $loginUrl . "</li>";
                    }
                    ?>
                </ul>
            </li>
            <li>
                <b>App Domains:</b>
                <ul class='nsl-list-disc'>
                    <li><?php echo str_replace('www.', '', $_SERVER['HTTP_HOST']) ?></li>
                </ul>
            </li>
            <li>
                <b>Website > Site URL:</b>
                <ul class='nsl-list-disc'>
                    <li><?php echo site_url() ?></li>
                </ul>
            </li>
        </ul>

        <?php
        $this->renderGettingStartedFooter();
    } ?>
</div>