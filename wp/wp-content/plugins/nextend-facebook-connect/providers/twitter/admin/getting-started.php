<?php
defined('ABSPATH') || die();
/** @var $this NextendSocialProviderAdmin */

$provider = $this->getProvider();
?>

<div class="nsl-admin-sub-content">
    <?php
    add_filter('nsl_getting_started_guide_url', function () use ($provider) {
        if ($provider->isV2Api()) {
            return $provider->getDocURL() . '#configuration-v2';
        }

        return $provider->getDocURL() . '#configuration-v1.1';
    });

    $this->renderGettingStartedHead();
    ?>

    <ul>
        <li>
            <b>Callback URI / Redirect URL:</b>
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
            <b>Website URL:</b>
            <ul class='nsl-list-disc'>
                <li><?php echo site_url(); ?></li>
            </ul>
        </li>
    </ul>

    <?php $this->renderGettingStartedFooter(); ?>
</div>