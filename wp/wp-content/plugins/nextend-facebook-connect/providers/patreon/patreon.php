<?php

class NextendSocialProviderPatreon extends NextendSocialProviderDummy {

    protected $color = '#EB7254';

    public function __construct() {
        $this->id     = 'patreon';
        $this->docUrl = 'https://social-login.nextendweb.com/documentation/providers/patreon/';
        $this->label  = 'Patreon';
        $this->path   = dirname(__FILE__);
    }
}

NextendSocialLogin::addProvider(new NextendSocialProviderPatreon());