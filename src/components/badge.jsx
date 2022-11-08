const Badge = ({color, name, size}) => {
    const classes = `badge bg-${color} me-1 ${size ?? ""}`;
    return <span className={classes}>{name}</span>;
}

export default Badge;