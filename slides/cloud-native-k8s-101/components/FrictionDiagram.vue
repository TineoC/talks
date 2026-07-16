<template>
  <div class="friction">
    <div class="friction-col laptop">
      <div class="friction-label">Laptop</div>
      <ul>
        <li>docker run</li>
        <li>localhost:3000</li>
        <li>root access</li>
        <li>single process</li>
        <li>manual config</li>
      </ul>
    </div>

    <div class="friction-col gap">
      <div class="friction-label">Hidden complexity</div>
      <div class="friction-chips">
        <span>networking</span>
        <span>identity</span>
        <span>storage</span>
        <span>secrets</span>
        <span>scaling</span>
        <span>policy</span>
      </div>
    </div>

    <div class="friction-col cluster">
      <div class="friction-label">Cluster</div>
      <ul>
        <li>kubectl apply</li>
        <li>ClusterIP / DNS</li>
        <li>RBAC + PSS</li>
        <li>orchestrated</li>
        <li>ConfigMaps</li>
      </ul>
    </div>
  </div>
</template>
