<?php
defined('ABSPATH') || die();
/** @var $this NextendSocialProviderAdmin */

$provider = $this->getProvider();

/**
 * @var $client NextendSocialProviderFacebookClient
 */
$client = $provider->getClient();

$this->renderFixRedirectUriHead();
?>
<ul>
    <li>
        <b>App ID:</b>
        <ul class='nsl-list-disc'>
            <li><?php echo $client->getClientId(); ?></li>
        </ul>
    </li>
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
</ul>
