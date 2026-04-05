<?php
defined('ABSPATH') || die();
/** @var $this NextendSocialProviderAdmin */

$provider = $this->getProvider();

?>

<a id="nsl-admin-getting-started-button" href="<?php echo $this->getUrl('settings'); ?>"
   class="button button-primary"><?php printf(__('I am done setting up my %s', 'nextend-facebook-connect'), $provider->getLabel() . ' ' . _x('App', 'Social Login App', 'nextend-facebook-connect')); ?></a>

</div> <!-- closing tag for getting-started-head.php:  <div class="nsl-admin-getting-started"> -->