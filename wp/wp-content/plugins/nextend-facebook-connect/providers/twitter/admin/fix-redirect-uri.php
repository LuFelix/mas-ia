<?php
defined('ABSPATH') || die();
/** @var $this NextendSocialProviderAdmin */

$provider = $this->getProvider();

/**
 * @var $client NextendSocialProviderTwitterClient|NextendSocialProviderTwitterv2Client
 */
$client = $provider->getClient();

$this->renderFixRedirectUriHead();
$isV2Api = $provider->isV2Api();

?>
<ul>
    <li>

        <b><?php echo ($isV2Api) ? 'Client ID:' : 'API Key' ?></b>
        <ul class='nsl-list-disc'>
            <li><?php echo ($isV2Api) ? $client->getClientId() : $client->getConsumerKey() ?></li>

        </ul>
    </li>
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