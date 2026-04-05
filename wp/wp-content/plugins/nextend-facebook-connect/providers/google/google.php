<?php

use NSL\Notices;

class NextendSocialProviderGoogle extends NextendSocialProviderOAuth {

    /** @var NextendSocialProviderGoogleClient */
    protected $client;

    protected $color = '#4285f4';
    protected $lightColor = '#fff';
    protected $darkColor = '#131314';
    protected $neutralColor = '#f2f2f2';

    protected $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F4" d="M20.64 12.2045c0-.6381-.0573-1.2518-.1636-1.8409H12v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M12 21c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H3.9574v2.3318C5.4382 18.9832 8.4818 21 12 21z"></path><path fill="#FBBC05" d="M6.964 13.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V7.9582H3.9573A8.9965 8.9965 0 0 0 3 12c0 1.4523.3477 2.8268.9573 4.0418L6.964 13.71z"></path><path fill="#EA4335" d="M12 6.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C16.4632 3.8918 14.426 3 12 3 8.4818 3 5.4382 5.0168 3.9573 7.9582L6.964 10.29C7.6718 8.1627 9.6559 6.5795 12 6.5795z"></path></svg>';
    const requiredApi1 = 'Google People API';

    protected $sync_fields = array(
        'locale'        => array(
            'label' => 'Locale',
            'node'  => 'me',
        ),
        'genders'       => array(
            'label'       => 'Genders',
            'node'        => 'people',
            'description' => self::requiredApi1,
        ),
        'biographies'   => array(
            'label'       => 'Biographies',
            'node'        => 'people',
            'description' => self::requiredApi1,
        ),
        'birthdays'     => array(
            'label'       => 'Birthdays',
            'node'        => 'people',
            'scope'       => 'https://www.googleapis.com/auth/user.birthday.read',
            'description' => self::requiredApi1,
        ),
        'occupations'   => array(
            'label'       => 'Occupations',
            'node'        => 'people',
            'description' => self::requiredApi1,
        ),
        'organizations' => array(
            'label'       => 'Organizations',
            'node'        => 'people',
            'description' => self::requiredApi1,
        ),
        'locations'     => array(
            'label'       => 'Locations',
            'node'        => 'people',
            'description' => self::requiredApi1,
        ),
        'ageRanges'     => array(
            'label'       => 'Age ranges',
            'node'        => 'people',
            'description' => self::requiredApi1,
        ),
        'addresses'     => array(
            'label'       => 'Addresses',
            'node'        => 'people',
            'scope'       => 'https://www.googleapis.com/auth/user.addresses.read',
            'description' => self::requiredApi1,
        ),
        'phoneNumbers'  => array(
            'label'       => 'Phone Numbers',
            'node'        => 'people',
            'scope'       => 'https://www.googleapis.com/auth/user.phonenumbers.read',
            'description' => self::requiredApi1,
        )
    );

    public function __construct() {
        $this->id     = 'google';
        $this->docUrl = 'https://social-login.nextendweb.com/documentation/providers/google/';
        $this->label  = 'Google';

        $this->path = dirname(__FILE__);

        $this->requiredFields = array(
            'client_id'     => 'Client ID',
            'client_secret' => 'Client Secret'
        );

        parent::__construct(array(
            'client_id'          => '',
            'client_secret'      => '',
            'select_account'     => 1,
            'skin'               => 'light',
            'login_label'        => 'Continue with <b>Google</b>',
            'register_label'     => 'Sign up with <b>Google</b>',
            'link_label'         => 'Link account with <b>Google</b>',
            'unlink_label'       => 'Unlink account from <b>Google</b>',
            'profile_image_size' => 'default'
        ));
    }

    protected function forTranslation() {
        __('Continue with <b>Google</b>', 'nextend-facebook-connect');
        __('Sign up with <b>Google</b>', 'nextend-facebook-connect');
        __('Link account with <b>Google</b>', 'nextend-facebook-connect');
        __('Unlink account from <b>Google</b>', 'nextend-facebook-connect');
    }

    public function getRawDefaultButton() {
        $skin = $this->settings->get('skin');
        switch ($skin) {
            case 'dark':
                $color = $this->darkColor;
                break;
            case 'neutral':
                $color = $this->neutralColor;
                break;
            default:
                $color = $this->lightColor;
        }

        return '<div class="nsl-button nsl-button-default nsl-button-' . $this->id . '" data-skin="' . $skin . '" style="background-color:' . $color . ';"><div class="nsl-button-svg-container">' . $this->svg . '</div><div class="nsl-button-label-container">{{label}}</div></div>';
    }

    public function getRawIconButton() {
        $skin = $this->settings->get('skin');
        switch ($skin) {
            case 'dark':
                $color = $this->darkColor;
                break;
            case 'neutral':
                $color = $this->neutralColor;
                break;
            default:
                $color = $this->lightColor;
        }

        return '<div class="nsl-button nsl-button-icon nsl-button-' . $this->id . '" data-skin="' . $skin . '" style="background-color:' . $color . ';"><div class="nsl-button-svg-container">' . $this->svg . '</div></div>';

    }

    public function validateSettings($newData, $postedData) {
        $newData = parent::validateSettings($newData, $postedData);

        foreach ($postedData as $key => $value) {

            switch ($key) {
                case 'tested':
                    if ($postedData[$key] == '1' && (!isset($newData['tested']) || $newData['tested'] != '0')) {
                        $newData['tested'] = 1;
                    } else {
                        $newData['tested'] = 0;
                    }
                    break;
                case 'profile_image_size':
                case 'skin':
                    $newData[$key] = trim(sanitize_text_field($value));
                    break;
                case 'client_id':
                case 'client_secret':
                    $newData[$key] = trim(sanitize_text_field($value));
                    if ($this->settings->get($key) !== $newData[$key]) {
                        $newData['tested'] = 0;
                    }

                    if (empty($newData[$key])) {
                        Notices::addError(sprintf(__('The %1$s entered did not appear to be a valid. Please enter a valid %2$s.', 'nextend-facebook-connect'), $this->requiredFields[$key], $this->requiredFields[$key]));
                    }
                    break;
                case 'select_account':
                    $newData[$key] = $value ? 1 : 0;
                    break;
            }
        }

        return $newData;
    }

    public function getClient() {
        if ($this->client === null) {

            require_once dirname(__FILE__) . '/google-client.php';

            $this->client = new NextendSocialProviderGoogleClient($this->id);

            $this->client->setClientId($this->settings->get('client_id'));
            $this->client->setClientSecret($this->settings->get('client_secret'));
            $this->client->setRedirectUri($this->getRedirectUriForAuthFlow());

            if (!$this->settings->get('select_account')) {
                $this->client->setPrompt('');
            }

        }

        return $this->client;
    }

    /**
     * @return array
     * @throws Exception
     */
    protected function getCurrentUserInfo() {
        $fields          = array(
            'id',
            'name',
            'email',
            'family_name',
            'given_name',
            'picture',
        );
        $extra_me_fields = apply_filters('nsl_google_sync_node_fields', array(), 'me');

        return $this->getClient()
                    ->get('userinfo?fields=' . implode(',', array_merge($fields, $extra_me_fields)));
    }

    public function getMe() {
        return $this->authUserData;
    }

    /**
     * @return array
     * @throws Exception
     */
    public function getMyPeople() {
        $extra_people_fields = apply_filters('nsl_google_sync_node_fields', array(), 'people');

        if (!empty($extra_people_fields)) {
            return $this->getClient()
                        ->get('people/me?personFields=' . implode(',', $extra_people_fields), array(), 'https://people.googleapis.com/v1/');
        }

        return $extra_people_fields;
    }

    /**
     * @param $key
     *
     * @return string
     */
    public function getAuthUserData($key) {
        switch ($key) {
            case 'id':
                return $this->authUserData['id'];
            case 'email':
                return $this->authUserData['email'];
            case 'name':
                return !empty($this->authUserData['name']) ? $this->authUserData['name'] : '';
            case 'first_name':
                return !empty($this->authUserData['given_name']) ? $this->authUserData['given_name'] : '';
            case 'last_name':
                return !empty($this->authUserData['family_name']) ? $this->authUserData['family_name'] : '';
            case 'picture':
                $profile_image_size = $this->settings->get('profile_image_size');
                $profile_image      = $this->authUserData['picture'];
                $avatar_url         = '';

                if (!empty($profile_image)) {
                    switch ($profile_image_size) {
                        case 'small':
                            $avatar_url = str_replace('=s96-c', '=s50-c', $profile_image);
                            break;
                        case 'medium':
                            $avatar_url = str_replace('=s96-c', '=s360-c', $profile_image);
                            break;
                        case 'large':
                            $avatar_url = str_replace('=s96-c', '=s480-c', $profile_image);
                            break;
                        case 'extralarge':
                            $avatar_url = str_replace('=s96-c', '=s720-c', $profile_image);
                            break;
                        case 'original':
                            $avatar_url = str_replace('=s96-c', '', $profile_image);
                            break;
                        default:
                            $avatar_url = $profile_image;
                            break;
                    }
                }

                return $avatar_url;
        }

        return parent::getAuthUserData($key);
    }

    public function syncProfile($user_id, $provider, $data) {
        if ($this->needUpdateAvatar($user_id)) {
            $this->updateAvatar($user_id, $this->getAuthUserData('picture'));
        }

        if (!empty($data['access_token_data'])) {
            $this->storeAccessToken($user_id, $data['access_token_data']);
        }
    }

    public function deleteLoginPersistentData() {
        parent::deleteLoginPersistentData();

        if ($this->client !== null) {
            $this->client->deleteLoginPersistentData();
        }
    }

    public function getAvatar($user_id) {

        if (!$this->isUserConnected($user_id)) {
            return false;
        }

        $picture = $this->getUserData($user_id, 'profile_picture');
        if (!$picture || $picture == '') {
            return false;
        }

        return $picture;
    }

    public function getSyncDataFieldDescription($fieldName) {
        if (isset($this->sync_fields[$fieldName]['description'])) {
            return sprintf(__('Required API: %1$s', 'nextend-facebook-connect'), $this->sync_fields[$fieldName]['description']);
        }

        return parent::getSyncDataFieldDescription($fieldName);
    }

    public function getProviderEmailVerificationStatus() {
        /**
         * The email address returned by Google is always verified
         */
        return true;
    }

}

NextendSocialLogin::addProvider(new NextendSocialProviderGoogle);