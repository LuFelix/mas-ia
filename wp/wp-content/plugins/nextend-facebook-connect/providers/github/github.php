<?php

class NextendSocialProviderGitHub extends NextendSocialProviderDummy {

    protected $color = '#24292e';

    public function __construct() {
        $this->id     = 'github';
        $this->docUrl = 'https://social-login.nextendweb.com/documentation/providers/github/';
        $this->label  = 'GitHub';
        $this->path   = dirname(__FILE__);
    }
}

NextendSocialLogin::addProvider(new NextendSocialProviderGitHub());