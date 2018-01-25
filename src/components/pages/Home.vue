<template>
    <div class="home-sec-1">
        <div class="uk-container uk-container-large">
            <div class="uk-card uk-card-default uk-width-1-2@m uk-margin-medium-top">
                <div class="uk-card-header">
                    <h3 class="uk-card-title">Welcome to the Complaints Portal</h3>
                </div>
                <div class="uk-card-body">
                    <p>Head over to the complaints page to see the list of complaints</p>
                </div>
                <div class="uk-card-footer">
                    <router-link to="/complaints">
                        <button class="uk-button uk-button-danger">
                            Complaints
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>
