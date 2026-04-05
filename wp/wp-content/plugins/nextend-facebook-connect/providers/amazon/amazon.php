<?php

class NextendSocialProviderAmazon extends NextendSocialProviderDummy {

    protected $color = '#2f292b';

    public function __construct() {
        $this->id     = 'amazon';
        $this->docUrl = 'https://social-login.nextendweb.com/documentation/providers/amazon/';
        $this->label  = 'Amazon';
        $this->path   = dirname(__FILE__);
    }
}

NextendSocialLogin::addProvider(new NextendSocialProviderAmazon());