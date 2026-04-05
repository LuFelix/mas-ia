<?php
defined('ABSPATH') || die();
/** @var $this NextendSocialProviderAdmin */

$provider = $this->getProvider();
?>

<div class="nsl-admin-sub-content">
    <?php $this->renderGettingStartedHead(); ?>

    <ul>
        <li>
            <b>Authorised redirect URIs:</b>
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
            <b>Authorized domains:</b>
            <ul class='nsl-list-disc'>
                <li><?php echo str_replace('www.', '', $_SERVER['HTTP_HOST']); ?></li>
            </ul>
        </li>
    </ul>

    <?php $this->renderGettingStartedFooter(); ?>
</div>