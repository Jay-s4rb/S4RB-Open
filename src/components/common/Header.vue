<template>
  <header id="top-nav" class="hello">
      <div class="uk-container uk-container-large">
        <nav class="" uk-navbar>
            <div class="uk-navbar-left">
                <ul class="uk-navbar-nav">
                    <li class="">
                        <router-link active-class="uk-active" :to="{ path: '/'}" exact>
                            <i uk-icon="icon: home"></i> Home
                        </router-link>
                    </li>
                    <li class="">
                        <router-link active-class="uk-active" :to="{ path: '/complaints'}" exact>
                            <i uk-icon="icon: cart"></i> Complaints
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
     </div>
  </header>
</template>

<script>
export default {
}
</script>
