<template>
  <div class="cover-terminal" aria-hidden="true">
    <div class="cover-terminal-bar">
      <span class="dot" />
      <span class="dot" />
      <span class="dot" />
      <span class="cover-terminal-title">lab — cloud-native-101</span>
    </div>
    <div class="cover-terminal-body">
      <p><span class="prompt">❯</span> docker build -t cloud-native-101-app:local .</p>
      <p class="out">[+] Building 4.2s (8/8) FINISHED</p>
      <p class="out"> => naming to cloud-native-101-app:local</p>
      <p><span class="prompt">❯</span> kubectl apply -f manifests/</p>
      <p class="out ok">deployment.apps/cloud-native-101 created</p>
      <p class="out ok">service/cloud-native-101 created</p>
      <p><span class="prompt">❯</span> kubectl get pods -n cloud-native-101</p>
      <p class="out table-line">NAME                             READY  STATUS</p>
      <p class="out table-line">cloud-native-101-7d8f9c-abc12   1/1    Running</p>
      <p class="out table-line">cloud-native-101-7d8f9c-def34   1/1    Running</p>
      <p><span class="prompt">❯</span> <span class="cursor">█</span></p>
    </div>
  </div>
</template>
