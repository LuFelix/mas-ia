<?php
defined('ABSPATH') || die();
/** @var $this NextendSocialProviderAdmin */

$provider = $this->getProvider();

/**
 * @var $client NextendSocialProviderGoogleClient
 */
$client = $provider->getClient();

$this->renderFixRedirectUriHead();
?>
<ul>
    <li>
        <b>Client ID:</b>
        <ul class='nsl-list-disc'>
            <li><?php echo $client->getClientId(); ?></li>
        </ul>
    </li>
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
</ul>