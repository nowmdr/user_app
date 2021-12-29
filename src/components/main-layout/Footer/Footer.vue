<template>
    <footer class="footer">
        <div>
            <p>© Copyright {{ date }}</p>
        </div>
    </footer>
</template>
<script>
import './Footer.scss'
export default {
    data() {
        return {
        date: new Date().getFullYear(),
        }
    },
}
</script>