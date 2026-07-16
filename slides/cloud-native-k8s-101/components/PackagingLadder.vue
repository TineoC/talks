<template>
  <div class="ladder">
    <div class="ladder-col vm">
      <div class="ladder-label">VM</div>
      <div class="ladder-stack">
        <div class="ladder-layer">App</div>
        <div class="ladder-layer thick">Guest OS</div>
        <div class="ladder-layer">Hypervisor</div>
        <div class="ladder-layer base">Host</div>
      </div>
      <p class="ladder-note">Full machine per app</p>
    </div>

    <div class="ladder-arrow" aria-hidden="true">→</div>

    <div class="ladder-col container">
      <div class="ladder-label">Container</div>
      <div class="ladder-stack">
        <div class="ladder-layer">App</div>
        <div class="ladder-layer">Runtime</div>
        <div class="ladder-layer base tall">Shared Host OS</div>
      </div>
      <p class="ladder-note">Package once, run anywhere</p>
    </div>

    <div class="ladder-arrow" aria-hidden="true">→</div>

    <div class="ladder-col k8s">
      <div class="ladder-label">Kubernetes</div>
      <div class="ladder-stack">
        <div class="ladder-layer accent">Many containers</div>
        <div class="ladder-layer">Scheduling · healing</div>
        <div class="ladder-layer">Networking · config</div>
        <div class="ladder-layer base">Cluster</div>
      </div>
      <p class="ladder-note">Run containers at scale</p>
    </div>
  </div>
</template>
