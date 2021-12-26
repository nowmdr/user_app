<template>
    <footer class="footer">
        <div>
            © Copyright {{ date }}
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